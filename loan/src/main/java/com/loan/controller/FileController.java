package com.loan.controller;

import cn.hutool.core.io.FileUtil;
import com.loan.enums.CodeEnum;
import com.loan.exception.BizException;
import com.loan.model.JsonResult;
import com.loan.enums.CodeEnum;
import com.loan.exception.BizException;
import com.loan.model.JsonResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Decoder;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;

/**
 * @description:
 * @author:
 * @time: 2019/11/20 20:36
 */
@RestController
@RequestMapping("/api/common")
public class FileController extends BaseController {


    @PostMapping("/upload")
    public JsonResult fileUpload(@RequestParam("file") MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return fail(CodeEnum.EMPTY_FILE);
        }
        try {
            return success(uploadFile(file));
        } catch (IOException e) {
            logger.warn("【上传文件失败】", e);
            throw new BizException(CodeEnum.UPLOAD_FILE_FAIL);
        }
    }

    @RequestMapping("/download/{url}")
    public JsonResult fileDownload(@PathVariable String url, HttpServletResponse response) throws IOException {
        BASE64Decoder decoder = new BASE64Decoder();
        byte[] bytes = decoder.decodeBuffer(url);
        File file = new File(new String(bytes));
        if (!file.exists()) {
            return fail(CodeEnum.SOURCE_NOT_EXIST);
        }
        try (ServletOutputStream outputStream = response.getOutputStream()) {
            outputStream.write(FileUtil.readBytes(file));
            outputStream.flush();
        }
        return success();
    }

}
