import { call, put, select, all, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from 'apisauce';
import { ShareAction } from 'react-native';
import moment from 'moment';

import {
  AddCertificateAction,
  AddCertificateFailureAction,
  AddCertificateSuccessAction,
  certificatesActionCreators,
  certificatesActionTypes,
  CertificateSelectors,
  CreateBackupAction,
  CreateBackupFailureAction,
  CreateBackupSuccessAction,
  LoadBackupAction,
  LoadBackupFailureAction,
  LoadBackupSuccessAction,
  ShareCertificateAction,
  ShareCertificateFailureAction,
  ShareCertificateSuccessAction,
} from '../redux/certificates';
import { apiInstance } from '../services/api';
import CONFIG from '../config/env';
import { Credential } from '../services/api/api.types';
import { StaticNavigator } from '../services/navigator';
import { getCredentialCertificate, getCredentialIssuer } from '../utils';
import EncryptionManager from '../services/encryption-manager';
import { CredentialsByIssuer } from '../utils/types';
import { FileManager } from '../services/file-manager';

function* addCertificate({ data }: AddCertificateAction) {
  try {
    const response: ApiResponse<Credential, Credential> = yield call(
      apiInstance.addCertificate,
      data.requestUrl.replace(CONFIG.API_URL, ''),
      {
        holder: data.did,
        ...data,
      },
    );

    if (response.ok) {
      const certificate = yield call(getCredentialCertificate, response.data!);
      const issuer = yield call(getCredentialIssuer, response.data!);
      yield put<AddCertificateSuccessAction>(
        certificatesActionCreators.addCertificateSuccess(),
      );
      yield call(StaticNavigator.navigateTo, 'AddCertificate', {
        certificate,
        issuer,
      });
    }
  } catch (err) {
    yield put<AddCertificateFailureAction>(
      certificatesActionCreators.addCertificateFailure(
        'Some problems with File/QRcode/deeplink. Try again.',
      ),
    );
  }
}

function* createBackup({ key }: CreateBackupAction) {
  try {
    const certificates: CredentialsByIssuer = yield select(
      CertificateSelectors.selectCertificates,
    );
    const certificatesString: string = yield call(JSON.stringify, certificates);
    const encryptedCertificatesString: string = yield call(
      EncryptionManager.encryptAES,
      certificatesString,
      key,
    );

    const filename = `backup_${moment().format('YYYY_MM_DD__HH_mm')}.dcc`;
    const filepath = yield call(
      FileManager.createFile,
      filename,
      encryptedCertificatesString,
    );

    const shareResponse: ShareAction = yield call(
      FileManager.shareFile,
      filepath,
      filename,
    );

    yield call(StaticNavigator.goBack);
    if (shareResponse.action === 'sharedAction') {
      yield put<CreateBackupSuccessAction>(
        certificatesActionCreators.createBackupSuccess({
          ...shareResponse,
          date: moment().format(),
        }),
      );
    }
  } catch (error) {
    yield call(StaticNavigator.goBack);
    yield put<CreateBackupFailureAction>(
      certificatesActionCreators.createBackupFailure(error),
    );
  }
}

function* createBackupSuccess({ backupInfo }: CreateBackupSuccessAction) {
  yield call(StaticNavigator.navigateTo, 'DoneBackup', { backupInfo });
}

function* loadBackup({ backupPath, key }: LoadBackupAction) {
  try {
    const cipher = yield call(FileManager.readFile, backupPath);

    const decryptedBackup = yield call(
      EncryptionManager.decryptAES,
      cipher,
      key,
    );

    const parsedBackup: CredentialsByIssuer = yield call(
      JSON.parse,
      decryptedBackup,
    );

    yield call(StaticNavigator.goBack);
    yield put<LoadBackupSuccessAction>(
      certificatesActionCreators.loadBackupSuccess(parsedBackup),
    );
  } catch (error) {
    yield call(StaticNavigator.goBack);
    yield put<LoadBackupFailureAction>(
      certificatesActionCreators.loadBackupFailure(
        'Invalid key! Please, try again.',
      ),
    );
  }
}

function* shareCertificate({ certificate }: ShareCertificateAction) {
  try {
    const certificateString: string = yield call(JSON.stringify, certificate);

    const filename = `certificate_${moment().format('YYYY_MM_DD__HH_mm')}.json`;
    const filepath = yield call(
      FileManager.createFile,
      filename,
      certificateString,
    );

    yield call(FileManager.shareFile, filepath, filename);
    yield put<ShareCertificateSuccessAction>(
      certificatesActionCreators.shareCertificateSuccess(),
    );
  } catch (error) {
    yield put<ShareCertificateFailureAction>(
      certificatesActionCreators.shareCertificateFailure(error),
    );
  }
}

export function* certificatesSaga() {
  yield all([
    takeLatest<AddCertificateAction>(
      certificatesActionTypes.ADD_CERTIFICATE,
      addCertificate,
    ),
    takeLatest<CreateBackupAction>(
      certificatesActionTypes.CREATE_BACKUP,
      createBackup,
    ),
    takeLatest<CreateBackupSuccessAction>(
      certificatesActionTypes.CREATE_BACKUP_SUCCESS,
      createBackupSuccess,
    ),
    takeLatest<LoadBackupAction>(
      certificatesActionTypes.LOAD_BACKUP,
      loadBackup,
    ),
    takeLatest<ShareCertificateAction>(
      certificatesActionTypes.SHARE_CERTIFICATE,
      shareCertificate,
    ),
  ]);
}
