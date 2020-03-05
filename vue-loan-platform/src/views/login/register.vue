<template>
    <div class="forget-pwd">
        <van-cell-group>
            <van-field
                    v-model="form.userName"
                    label="手机号"
                    placeholder="请输入手机号"
            />

            <van-field
                    v-model="form.code"
                    label="验证码"
                    placeholder="请输入图片验证码"
            >
                <div class="code" slot="right-icon" @click="againCode">
                    <img :src="imgCode"/>
                </div>
            </van-field>
            <van-field
                    class="sms-code"
                    v-if="isShow"
                    v-model="form.smsCode"
                    label="短信验证码"
                    placeholder="请输入短信验证码"
            >
                <van-button
                        v-show="sendAuthCode"
                        @click="send"
                        slot="button"
                        class="send-code"
                        size="small"
                        type="primary"
                >发送验证码
                </van-button
                >
                <van-button
                        v-show="!sendAuthCode"
                        slot="button"
                        class="send-code"
                        size="small"
                        type="primary"
                >{{ auth_time }}s
                </van-button
                >
            </van-field>
            <van-field
                    v-model="form.password"
                    type="password"
                    label="登录密码"
                    placeholder="请设置6-16位密码"
            ></van-field>
        </van-cell-group>
        <van-checkbox class="user-xy" v-model="checked" shape="square">
            同意
            <span class="xy-link" @click="loanXy">《用户注册协议》</span>
        </van-checkbox>
        <van-button type="primary" class="loan-button" @click="_register"
        >注册
        </van-button
        >
    </div>
</template>
<script>
    export default {
        name: 'register',
        data() {
            return {
                form: {
                    userName: '',
                    code: '',
                    password: '',
                    smsCode: ''
                },
                content: `在注册成为本产品用户前，请用户务必认真、仔细阅读，并对本协议全部内容作充分理解。用户成功注册或使用本产品，即视为用户已经充分理解和同意本协议全部内容，本协议立即在用户与本公司之间产生法律效力，用户注册使用本产品服务的全部活动将受到本协议的约束并承担相应的责任和义务。如用户不同意本协议内容，请不要注册或使用本产品。

用户须保证在注册或使用本产品时，已经年满18周岁且具备完全民事行为能力。如用户不具备前述条件，用户应终止注册或停止使用本产品。用户若通过本人注册的账户为其他不具备前述条件的任何第三方借款，本公司有权拒绝提供服务，已提供服务的，本公司有权终止并保留追究责任的权利，因此产生的任何法律责任由用户自行承担。

本协议包括以下所有条款，同时也包括本产品已经发布的或者将来可能发布的各类规则（平台规则）。所有规则均为本协议不可分割的一部分，与本协议具有同等法律效力。

用户在此确认知悉并同意本公司有权根据需要不时修改、增加或删减本协议。本公司将采用在本产品公示的方式通知用户该等修改、增加或删减，用户有义务注意该等公示。一经本产品公示，视为已经通知到用户。用户同意并确认，本公司可能以页面消息、微信、短消息等方式向用户发送将来可能发布的各类规则，该等规则构成本协议的一部分。若用户在本协议及各类规则变更后继续使用本产品服务的，视为用户已仔细认真阅读、充分理解并同意接受修改、增加或删减后的本协议及各类规则，且用户承诺遵守修改、增加或删减后的本协议及各类规则内容，并承担相应的责任和义务。若用户不同意修改、增加或删减后的本协议或各类规则内容，应立即停止使用本产品服务，本公司保留中止、终止或限制用户继续使用本产品服务的权利，但该等终止、中止或限制行为并不豁免用户在本产品已经发生的行为下所应承担的责任和义务。本公司不承担任何因此导致的法律责任。

一、账户管理

1.1. 用户注册本产品时请按照本公司要求准确提供个人信息，并在取得注册账户（下称“该账户”）后及时更新用户准确、最新、完整的身份信息及相关资料，包括不限于手机号码、身份证号码、亲属联系人及社会联系人姓名、职业、银行账户等信息，以便本公司与用户进行及时、有效联系。

1.2. 用户应当使用自身合法的身份信息进行注册，若用户冒用、盗用、拾得他人身份证件办理本公司提供的产品/服务的，用户对此承担所有法律责任；本公司仅对用户的身份信息承担形式审查责任，且仅在自身业务职责范围内承担法律责任。

1.3. 该账户仅供用户本人使用，用户对使用该账户或密码进行的一切操作及言论负完全的责任。用户须对该账户、密码、身份信息等进行妥善保管，对于因密码、身份信息、校验码等泄露所致的损失由用户自行承担。如用户存在遗失手机或身份证件或银行卡以及其他可能危及本产品账户资金安全或发现有他人冒用或盗用用户的账户登录名及密码或任何其他未经合法授权的情形，应立即以有效方式通知本公司，向本公司申请暂停相关服务。除非另有法律规定或经司法裁判，且征得本公司同意，否则用户不得以任何方式转让、赠与或继承（相关的财产权益除外）其账号及密码等个人信息。

1.4. 用户不得通过本人注册的账户为任何第三方借款，用户充分知悉并承诺，不得以本人的账户出租、出借给他人，且用户充分知悉：若用户以本人账户出租、出借给他人使用，用户仍应承担《借款协议》项下的还款及其他义务。

1.5. 若用户有上述违反本协议约定情形的，产生的任何法律责任均由用户承担，本公司对此不承担任何法律责任

1.6. 在需要终止使用本产品时，用户可以申请注销本产品账户，用户应当依照本公司规定的程序进行账户注销。本产品账户注销将导致本公司终止为用户提供本产品及相关服务，本协议约定的双方的权利义务终止，但依本协议其他条款另行约定不得终止的或依其性质不能终止的除外。

1.7. 存在以下情形的，本公司有权拒绝用户注销账户的申请并应将拒绝理由告知用户：1.该账户尚存在未了结的权利义务关系；2.注销该账户会损害本公司、本公司用户或他人的合法权益；3.本公司认为不适宜注销该账户的其他情形。

二、服务内容

本产品是由本公司投资并运营的提供自然人间借款信息及撮合服务平台。本公司为用户提供信息发布、信用咨询、合同管理、资金代管、还款管理，以及促成用户与第三方出借人达成交易的居间服务。

2.1. 信用评估：信用评估服务是指本公司为用户提供的通过读取和分析用户的个人公开信息、用户授权本公司使用的个人隐私信息及其他授权信息来评估用户信用状况的服务。为使本公司顺利分析与用户信用信息相关的个人信息，用户在此不可撤销地授权本公司采集、读取、分析、使用及处理用户的以下信息：1、甲方的身份信息；2、甲方的手机账单、清单、实名制等信息；3、甲方的银行卡信息；4、其他有助于乙方授予甲方信用额度的信息。

2.2. 信息发布：用户注册成为本产品用户后，可以按照平台规则委托本公司将其借款需求信息通过本公司公开发布，即发出借款要约。

2.3. 借款申请审批：用户应当按照本公司要求的程序进行申请，包括但不限于银行储蓄卡绑定、持证自拍、本公司工作人员或本公司指定的机构及人员与用户通过微信、电话进行核实等。用户完成上述申请程序后，本公司将对用户的申请进行审批。

2.4. 查询：本公司将对用户在本产品中的所有操作进行记录，不论该操作之目的最终是否实现。用户可以在本产品中查询其注册用户名下的个人信息及借贷交易记录。

2.5. 交易：用户在平台申请借款或其他服务时，需遵从用户与本公司及第三方出借人达成的借款协议及其他任何协议。

2.6. 广告：提供服务的过程中，本公司可以自行或由第三方广告商向用户发送广告、推广或宣传信息（包括商业与非商业信息），其方式和范围可不经向用户特别通知而变更。对服务中出现的广告信息

三、免责声明

本网站在此特别声明对如下事宜不承担任何法律责任：

(一) 本网站在此声明，对您使用网站、与本网站相关的任何内容、服务或其它链接至本网站的站点、内容均不作直接、间接、法定、约定的保证。

(二) 无论在任何原因下（包括但不限于疏忽原因），对您或任何人通过使用本网站上的信息或由本网站链接的信息，或其他与本网站链接的网站信息所导致的 损失或损害 （包括直接、间接、特别或后果性的损失或损害，例如收入或利润之损失，电脑系统之损坏或数据丢失等后果），责任均由使用者自行承担

（包括但不限于疏忽责任）

使用者对本网站的使用即表明同意承担浏览本网站的全部风险，由于本网站未参与建设、制作或发展本网站或提供内容，对使用者在本网站存取资料所导致的任何直接、相关的、后果性的、间接的或金钱上的损失不承担任何责任。

`,
                imgCode: '',
                checked: true,
                isShow: false,
                sendAuthCode: true,
                auth_time: 0
            }
        },
        mounted() {
            this.getImgCode()
            this.getOpenStatus()
        },
        methods: {
            getImgCode() {
                this.$api.common.imageCode().then(() => {
                    const num = Math.ceil(Math.random() * 10000000)
                    this.imgCode = `${process.env.VUE_APP_BASE_API}/front/imageCode?${num}`
                })
            },
            getOpenStatus() {
                this.$api.common.openStatus().then(res => {
                    this.isShow = res.data
                })
            },
            _register() {
                if (!this.checked) {
                    this.$toast({
                        type: 'warning',
                        message: '请您同意并勾选协议'
                    })
                    return false
                }
                if (!this.form.userName) {
                    this.$toast({
                        type: 'warning',
                        message: '请输入手机号'
                    })
                    return false
                } else if (!/^1[0-9]{10}$/.test(this.form.userName)) {
                    this.$toast({
                        type: 'warning',
                        message: '请输入正确的手机号'
                    })
                    return false
                } else if (!this.form.code) {
                    this.$toast({
                        type: 'warning',
                        message: '请输入验证码'
                    })
                    return false
                } else if (this.isShow && !this.form.smsCode) {
                    this.$toast({
                        type: 'warning',
                        message: '请输入短信验证码'
                    })
                    return false
                } else if (
                    !this.form.password ||
                    this.form.password.length < 6 ||
                    this.form.password.length > 16
                ) {
                    this.$toast({
                        type: 'warning',
                        message: '请输入6-16位密码'
                    })
                    return false
                }
                this.$api.common.register(this.form).then(res => {
                    if (res.code === 200) {
                        this.$toast({
                            type: 'success',
                            message: '注册成功'
                        })
                        setTimeout(() => {
                            this.$router.push({name: 'login'})
                        })
                    }
                })
            },
            send() {
                if (!this.form.userName) {
                    this.$toast({
                        type: 'warning',
                        message: '请输入手机号'
                    })
                    return false
                } else if (!/^1[0-9]{10}$/.test(this.form.userName)) {
                    this.$toast({
                        type: 'warning',
                        message: '请输入正确的手机号'
                    })
                    return false
                }
                this.getAuthCode()
                this.$api.common.getMobileCode(this.form.userName, 1).then(res => {
                    if (res.code === 200) {
                        this.$toast({
                            type: 'success',
                            message: '验证码发送成功'
                        })
                    }
                })
            },
            againCode() {
                this.getImgCode()
            },
            loanXy() {
                this.$dialog
                    .alert({
                        title: '《用户注册协议》',
                        message: this.content,
                        className: 'user-xy',
                        confirmButtonText: '关闭'
                    })
                    .then(() => {
                        // on confirm
                    })
            },
            getAuthCode() {
                this.sendAuthCode = false
                this.auth_time = 60
                let auth_timetimer = setInterval(() => {
                    this.auth_time--
                    if (this.auth_time <= 0) {
                        this.sendAuthCode = true
                        clearInterval(auth_timetimer)
                    }
                }, 1000)
            }
        }
    }
</script>
<style lang="less">
    .forget-pwd {
        .user-xy {
            margin: 15px 0 15px 3%;

            span.xy-link {
                color: #1989fa;
            }
        }

        .code {
            img {
                width: 65px;
                height: 24px;
            }
        }

        .sms-code {
            .van-button {
                width: 78px;
            }
        }

        .send-code {
            width: 78px;
        }
    }

    .user-xy {
        .van-dialog__message {
            text-align: left;
        }
    }
</style>
