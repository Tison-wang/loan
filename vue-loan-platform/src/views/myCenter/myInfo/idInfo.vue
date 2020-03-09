<template>
    <div class="id-info">
        <div class="tips">填写真实有效的信息，审核才会通过哦~</div>
        <van-cell-group>
            <van-field
                    v-model="form.name"
                    required
                    label="姓名"
                    placeholder="请输入真实的姓名"
            />

            <van-field
                    v-model="form.idCardNumber"
                    label="身份证号"
                    placeholder="请输入真实身份证"
                    required
            />
        </van-cell-group>
        <div class="tips">
            <p>*须本人身份证，且内容清晰可辨</p>
            <p>*请您确认拍照权限已开启</p>
        </div>
        <van-uploader :max-count="1" :after-read="handleFront" accepte="image/*">
            <div class="auto-uploader" slot="default">
                <img v-if="frontImg" :src="frontImg"/>
                <img v-else src="../../../assets/images/front.png"/>
            </div>
        </van-uploader>
        <van-uploader :max-count="1" :after-read="handleReverse" accepte="image/*">
            <div class="auto-uploader" slot="default">
                <img v-if="reverseImg" :src="reverseImg"/>
                <img v-else src="../../../assets/images/reverse.png"/>
            </div>
        </van-uploader>
        <van-uploader :max-count="1" :after-read="handleHold" accepte="image/*">
            <div class="auto-uploader" slot="default">
                <img v-if="holdImg" :src="holdImg"/>
                <img v-else src="../../../assets/images/hold.png"/>
            </div>
        </van-uploader>
        <van-button type="primary" @click="handleSend" class="loan-button"
        >提交
        </van-button
        >
    </div>
</template>
<script>
    import {Toast} from 'vant';

    export default {
        name: 'idInfo',
        data() {
            return {
                frontImg: '',
                reverseImg: '',
                holdImg: '',
                idcardReg: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                form: {
                    name: '',
                    idCardNumber: '',
                    idCardFrontImage: '',
                    idCardReverseImage: '',
                    idCardHoldImage: ''
                }
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                this.$api.common.getInfo().then(res => {
                    if (res.code === 200) {
                        if (res.data) {
                            this.form = {
                                name: res.data.name,
                                idCardNumber: res.data.idCardNumber,
                                idCardFrontImage: res.data.idCardFrontImage,
                                idCardReverseImage: res.data.idCardReverseImage,
                                idCardHoldImage: res.data.idCardHoldImage
                            }
                            this.frontImg = `${process.env.VUE_APP_BASE_API}/common/download/${this.form.idCardFrontImage}`
                            this.reverseImg = `${process.env.VUE_APP_BASE_API}/common/download/${this.form.idCardReverseImage}`
                            this.holdImg = `${process.env.VUE_APP_BASE_API}/common/download/${this.form.idCardHoldImage}`
                        }
                    }
                })
            },
            handleSend() {
                if (!this.form.name) {
                    this.$toast({
                        type: 'warning',
                        message: '请输入真实的姓名'
                    })
                    return false
                } else if (!this.form.idCardNumber) {
                    this.$toast({
                        type: 'warning',
                        message: '请输入真实身份证'
                    })
                    return false
                } else if (!this.idcardReg.test(this.form.idCardNumber)) {
                    this.$toast({
                        type: 'warning',
                        message: '请输入正确的身份证'
                    })
                    return false
                } else if (!this.form.idCardFrontImage) {
                    this.$toast({
                        type: 'warning',
                        message: '请上传身份证正面照'
                    })
                    return false
                } else if (!this.form.idCardReverseImage) {
                    this.$toast({
                        type: 'warning',
                        message: '请上传身份证反面照'
                    })
                    return false
                } else if (!this.form.idCardHoldImage) {
                    this.$toast({
                        type: 'warning',
                        message: '请上传手持身份证照'
                    })
                    return false
                }
                this.$api.common.updateInfo(this.form).then(res => {
                    if (res.code === 200) {
                        this.$toast({
                            type: 'success',
                            message: '保存成功'
                        })
                        this.$router.push({name: 'myInfo'})
                    }
                })
            },
            handleFront(file) {
                this.uploadFile(file, 1);
            },
            handleReverse(file) {
                this.uploadFile(file, 2);
            },
            handleHold(file) {
                this.uploadFile(file, 3);
            },
            uploadFile(file, uploadType) {
                if (file.file.size > 1024 * 1024 * 5) {
                    Toast.fail("上传的图片太大，请重新选择5M以下的图片上传！");
                    return;
                }
                let loading = Toast.loading({
                    forbidClick: true,
                    duration: 0,
                    message: '上传中...'
                });
                if (uploadType === 1) {
                    this.frontImg = file.content
                } else if (uploadType === 2) {
                    this.reverseImg = file.content
                } else if (uploadType === 3) {
                    this.holdImg = file.content
                }
                this.compress(file.content, {
                    quality: 0.2
                }, (base64) => {
                    let param = {'base64Str': base64, 'fileName': file.file.name}
                    this.$api.common.uploadFile2(param).then(res => {
                        if (uploadType === 1) {
                            this.form.idCardFrontImage = res.data
                        } else if (uploadType === 2) {
                            this.form.idCardReverseImage = res.data
                        } else if (uploadType === 3) {
                            this.form.idCardHoldImage = res.data
                        }
                        loading.clear();
                        if (res.code != 200) {
                            Toast.fail("上传失败：" + res.msg);
                        } else {
                            Toast.success("上传成功");
                        }
                    }, error => {
                        loading.clear();
                        console.log(error);
                        Toast.fail("上传失败：图片太大！");
                    })
                });
            },
            // 图片压缩
            compress(path, obj, callback) {
                let img = new Image();
                img.src = path;
                img.onload = function () {
                    let that = this;
                    // 默认按比例压缩
                    let w = that.width,
                        h = that.height,
                        scale = w / h;
                    w = obj.width || w;
                    h = obj.height || (w / scale);

                    //生成canvas
                    let canvas = document.createElement('canvas');
                    let ctx = canvas.getContext('2d');
                    canvas.width = w;
                    canvas.height = h;
                    ctx.drawImage(img, 0, 0, w, h);

                    // 默认图片质量为0.7
                    let quality = 0.7;
                    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                        quality = obj.quality;
                    }

                    // 回调函数返回base64的值
                    let base64 = canvas.toDataURL('image/jpeg', quality);
                    callback ? callback(base64) : null;
                    //return base64;
                }
            }
        }
    }
</script>
<style lang="less">

    .uploader_box {
        width: 100%;
        height: auto;
        overflow: hidden;
        position: relative;
    }

    #logimg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }

    .camera-icon {
        width: 100%;
        height: auto;
    }

    .id-info {
        .tips {
            text-align: center;
            padding: 10px 0;
        }

        .van-uploader {
            display: block;
            background: #fff;

            .van-uploader__wrapper {
                justify-content: center;
            }

            .auto-uploader {
                margin: 0 auto;

                img {
                    max-height: 220px;
                    max-width: 100%;
                }
            }
        }

        .loan-button {
            margin-bottom: 20px;
        }
    }
</style>
