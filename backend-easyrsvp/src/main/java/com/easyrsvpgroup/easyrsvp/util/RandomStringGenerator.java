package com.easyrsvpgroup.easyrsvp.util;

import java.util.concurrent.ThreadLocalRandom;

public class RandomStringGenerator {
    final static char[] dict = {
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
    };
    final static int minPos = 0;
    final static int maxPos = 62;

    public static String generate() {
        StringBuilder sb = new StringBuilder();

        for(int i = 0; i < 6; i++) {
            int randomNum = ThreadLocalRandom.current().nextInt(minPos, maxPos);
            sb.append(dict[randomNum]);
        }

        return sb.toString();
    }
}
