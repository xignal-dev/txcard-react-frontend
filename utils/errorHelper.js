import i18n from '../i18n/i18n';
import stores from "../stores";
import Router from "next/router";
// import {EXCHANGE_NAME} from "../constants";

class ErrorHelper{
    handleErrorCode(error) {
        let {
            error_code,
            status_code,
            error_message,
            default_code,
            default_detail
        } = this._parseError(error);

        let message = null;

        // 지갑이 없음
        //if (status_code == 400) { return;}

        /* token 만료 */
        if (status_code == 401) {
            return;
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem('access_token');
                window.localStorage.removeItem('user_uuid');
            }
            return;
        }


        /* not found */
        if (status_code == 404) { return ;}

        /* 타임아웃
        if (status_code == 408) {
            modalStore.openPreset({
                title: '요청들을 처리중입니다.',
                content: '현재 요청량이 많아 순차적으로 요청을 처리중입니다',
                buttons: [{ name: i18next.t('button/confirm') }]
            });
            return;
        }*/

        /* throttled
        if (status_code == 429) {
            // modalStore.openPreset({
            //     title: '처리 지연',
            //     content: '이전 요청을 처리중입니다.',
            //     buttons: [{ name: i18next.t('button/confirm') }]
            // });
            return;
        }*/

        /* 502 bad gateway */
        if (+status_code >= 500) { return ; }
        if (status_code == 500) { return ; }
        if (status_code == 501) { return ; }
        if (status_code == 502) { return ; }
        if (status_code == 503) { return ; }
        if (status_code == 504) { return ; }
        if (status_code == 505) { return ; }
        if (status_code == 506) { return ; }
        if (status_code == 429) { return ; }

        // OTP CODE가 틀린경우
        if (error_code == 5003) {
            return;
        }

        if(error_code === 2619) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/old-pincode-new-pincode-should-be-different'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2618) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/pin-code-is-invalid'))
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2617) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/pin-code-is-not-registered'))
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2616) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/pin-code-already-set'))
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2615) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/pin-code-not-number-type'))
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2614) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/pin-code-not-right-digit'))
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2613) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/pin-code-not-same'))
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 4000) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/price-should-be-positive'))
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2132) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/need-to-register-phone-first'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2612) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/owner-not-same'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2611) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/too-many-asset'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2610) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/transfer-left'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2609) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/active-order-left'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2608) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/password-not-valid'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2607) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/need-to-verify-previous'))
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2129) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/need-to-register-email'))
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2606) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/check-if-data-is-invalid'))
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2605) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/privacy-movement-not-agreed'))
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2604) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/privacy-handling-not-agreed'))
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2603) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/privacy-collection-not-agreed'))
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2602) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/terms-of-service-not-agreed'))
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2601) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/email-wrong-format'))
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2600) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/email-does-not-match'))
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 3034) {
            if(default_code === 'not_allowed_to_withdraw_yet') {
                try {
                    stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/not_allowed_to_withdraw_yet'))
                } catch (e) {
                    console.log(e);
                }
            }

            return;
        }

        if (error_code === 1000) {
            if(default_code === 'password_consecutive' && default_detail === 'password') {
                try {
                    stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/password-cannot-be-consecutive'));
                } catch (e) {
                    console.log(e);
                }
            }

            if(default_code === 'invalid_image' && default_detail === 'file') {
                try {
                    stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/invalid-image'))
                } catch (e) {
                    console.log(e);
                }

                return;
            }
            if(default_code === 'invalid' && default_detail === 'file') {
                try {
                    stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/invalid-input'))
                } catch (e) {
                    console.log(e);
                }

                return;
            }
            if(default_code === 'password_too_short') {
                try {
                    stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/password_too_short'))
                } catch(e) {
                    console.log(e);
                }

                return;
            }

            if(default_code === 'password_too_common') {
                try {
                    stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/password_too_common'))
                } catch(e) {
                    console.log(e);
                }

                return;
            }

            if(default_code === 'password_entirely_numeric') {
                try {
                    stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/password_entirely_numeric'))
                } catch(e) {
                    console.log(e);
                }

                return;
            }

            if(default_detail === 'code') {
                stores.alertStore.open(i18n.i18n.t("ErrorHelper/statement/only-english-characters-and-numbers-are-allowed"));
                return;
            }

            if(default_detail === 'memo') {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/please-input-memo'));
                return;
            }

            if(default_code === 'blank') {
                if(default_detail === 'email') {
                    stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/email-blank'));
                    return;
                }

                if(default_detail === 'password') {
                    stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/password-blank'));
                    return;
                }

                if(default_detail === 'otp_code') {
                    stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/otp-blank'));
                    return;
                }

                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/please-check-empty-input-box'));
                return;
            }


        }

        if(error_code === 4004) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/minimum_order_amount_not_met'))
            } catch(e) {
                console.log(e);
            }

            return;
        }

        if (error_code == 2121) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/you-left'))
            } catch(e) {
                console.log(e);
            }

            return;
        }

        if (error_code == 2010) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/wrong-email-password'))
            } catch(e) {
                console.log(e);
            }

            return;
        }

        if (error_code == 2118) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/too-many-attemps'))
            } catch(e) {
                console.log(e);
            }

            return;
        }

        if(error_code == 2100) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/provided-otp-code-is-not-verified'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code == 2109) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/provided-temporary-password-reset-token-expired'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code == 5000) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/withdrawal-has-already-been-approved'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code == 3032) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/too-small-value'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code == 3033) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/withdrawal-amount-exceeds-overdraft-limit'));
            } catch (e) {
                console.log(e);
            }

            return;
        }
        
        if(error_code == 3033) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/volume-cannot-be-negative'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code == 7000) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/this-referral-code-is-already-in-use'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code == 7002) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/email-should-be-verified-to-create-referral-code'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code == 8006) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/invalid-wallet-address'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code == 8007) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/wallet-not-exists'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 8008) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/own-wallet-withdrawal-not-allowed', {exchange_name: 'TRAVEL EXPRESS'}));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        /*if (error_code == 2111) {
            modalStore.openError({
                title: '미성년자 인증 불가',
                content: `미성년자는 핸드폰 인증이 불가합니다.`,
                buttons: [{ name: i18next.t('button/confirm') }]
            });
            return;
        }

        if (error_code == 2112) {
            modalStore.openError({
                title: '탈퇴 처리된 아이디',
                content: '탈퇴 처리된 아이디로는 로그인이 불가합니다.',
                buttons: [{ name: i18next.t('button/confirm') }]
            });
            return;
        }

        if (error_code == 2119) {
            modalStore.openError({
                title: 'KYC 인증 필요',
                content: 'KYC가 완료된 회원만 진행할 수 있습니다.',
                buttons: [{ name: i18next.t('button/confirm') }]
            });
            return;
        }*/

        /* 72시간 전 채굴 불가 에러 코드 */
        /*if (error_code == 3034) {
            modalStore.openError({
                title: '출금 불가',
                content: '첫 원화입금 이후 72시간이 지나야 출금이 가능합니다.',
                buttons: [{ name: i18next.t('button/confirm') }]
            });
            return;
        }

        if (error_code == 3036) {
            modalStore.openPreset({
                title: '정산 필요',
                content: '정산이 필요합니다.\n아래 연락처로 문의 부탁드립니다.\n\ncs@coinbit.co.kr\n고객센터: 1661-5645',
                buttons: [{ name: i18next.t('button/confirm') }]
            });
            return;
        }*/


        /* 120시간 전 채굴 불가 에러 코드 */
        /*if (error_code == 3038) {
            modalStore.openError({
                title: '출금 불가',
                content: '첫 원화입금 이후 120시간이 지나야 출금이 가능합니다.',
                buttons: [{ name: i18next.t('button/confirm') }]
            });
            return;
        }

        // 추가 이메일
        if (error_code == 3039) {
            modalStore.openError({
                title: '출금 불가',
                content: '출금을 위해 이메일 인증이 필요합니다.',
                buttons: [{ name: i18next.t('button/confirm') }]
            });
            return;
        }

        // 추가 kyc
        if (error_code == 3040) {
            modalStore.openError({
                title: '출금 불가',
                content: '출금을 위해 KYC 인증이 필요합니다.',
                buttons: [{ name: i18next.t('button/confirm') }]
            });
            return;
        }

        // 추가 핸드폰 인증
        if (error_code == 3041) {
            modalStore.openError({
                title: '출금 불가',
                content: '출금을 위해 핸드폰 인증이 필요합니다.',
                buttons: [{ name: i18next.t('button/confirm') }]
            });
            return;
        }

        // 추가 핸드폰 인증
        if (error_code == 3042) {
            modalStore.openError({
                title: '출금 불가',
                content: '출금을 하시려면, 필요한 인증을 모두 마치셔야합니다.',
                buttons: [{ name: i18next.t('button/confirm') }]
            });
            return;
        }

        if (error_code == 3043) {
            modalStore.openPreset({
                title: '출금 불가',
                content: '마지막 원화입금 시간으로부터 120시간 뒤에 암호화폐 출금이 가능합니다.',
                buttons: [{ name: i18next.t('button/confirm') }]
            });
            return;
        }

        if (error_code == 3044) {
            modalStore.openPreset({
                title: '출금 불가',
                content: i18next.t('not_allowed_time'),
                buttons: [{ name: i18next.t('button/confirm') }]
            });
            return;
        }*/

        /* 지갑 추가시 지갑 주소가 바르지 않을 경우 */
        /*if (error_code == 8006) {
            alert('잘못된 형식의 주소입니다. 입력한 주소값을 확인해주세요.');
            return;
        }

        if(
            default_code == 'user_is_blocked_for_abusing_attempts'
        ){
            modalStore.openError({
                title: '',
                content: i18next.t(default_code),
                buttons: [{ name: i18next.t('button/confirm') }]
            });
            return;
        }

        if (default_code == 'unique' && default_detail == 'email') {
            // 회원가입시 이미 존재하는 이메일을 입력하면 위와 같은 조합으로 에러가 옮
            // 추후 서버측에서 에러 메시지응 개선하면 사라질 분기임
            message = i18next.t('not_unique_email');
        } else {
            if (i18next.language === 'en' && error_message) {
                message = error_message;
            } else {
                message = i18next.t(default_code);
            }
        }

        if (message) {
            modalStore.openError({
                title: '',
                content: message,
                buttons: [{ name: i18next.t('button/confirm') }]
            });
        } else {
            modalStore.openError({
                title: i18next.t('unknown_error_title'),
                content: i18next.t('unknown_error_message'),
                buttons: [{ name: i18next.t('button/confirm') }]
            });
        }*/

        if (error_code == 2017) {
            return;
        }

        if(error_code === 2000) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/email-address-is-already-registered'))
            } catch(e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2001) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/passwords-are-not-equal'))
            } catch(e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 3045) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/you-already-have-pending-deposits'));
            } catch(e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2500) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/referral-code-not-exists'));
            } catch(e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2501) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/cannot-change-previously-registered-password'))
            } catch (e) {
                console.log(e)
            }

            return;
        }

        if(error_code === 3023) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/no-support-coin'));
            } catch(e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 4009) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/is-not-available-value'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 3000) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/balance-is-not-enough'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2126) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/the-number-is-already-in-use'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2127) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/already-email-verified'), Router.replace('/login'));
            } catch (e) {
                console.log(e);
            }

            return;
        }

        if(error_code === 2128) {
            try {
                stores.alertStore.open(i18n.i18n.t('ErrorHelper/statement/code-not-exists'));
            } catch (e) {
                console.log(e);
            }

            return;
        }



        if (error_message) {
            stores.alertStore.open(error_message);
        } else {
            stores.alertStore.open(error_message);
        }
    }

    _parseError = (error) => {
        let error_code = error.data.error_code;
        let status_code = error.status;
        let error_message = error.data.error_detail;
        let {
            code: default_code,
            string: default_detail
        } = (error.data.targets && error.data.targets[0]) || {}

        return {
            error_code,
            status_code,
            error_message,
            default_code,
            default_detail
        };
    }
}

const errorHelper = new ErrorHelper();
export default errorHelper;
