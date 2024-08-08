package org.example.misa.component;

import io.jsonwebtoken.io.Decoders;

public final class DecodeURIUtils {

    public static String decodeParamByBase64(String name) {
        byte[] bytes = Decoders.BASE64.decode(name);
        name = new String(bytes);
        return name;
    }
}
