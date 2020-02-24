package com.loan.util;

import java.util.Random;

/**
 * @description:
 * @author:
 * @time: 2019/12/4 22:02
 */
public final class RandomUtil {

    private static final String NUMBERS = "0123456789";

    private static final String CHARS = "abcdefghijklmnopqrstuvwxyz";

    private RandomUtil() {
    }

    /**
     * 随机生成6位数字
     *
     * @return
     */
    public static String generatorSixNumber() {
        Random rand = new Random();
        StringBuffer flag = new StringBuffer();
        for (int j = 0; j < 6; j++) {
            flag.append(NUMBERS.charAt(rand.nextInt(9)) + "");
        }
        return flag.toString();
    }
}
