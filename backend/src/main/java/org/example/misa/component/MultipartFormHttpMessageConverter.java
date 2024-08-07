package org.example.misa.component;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.AbstractJackson2HttpMessageConverter;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;

/*
Swagger UI 에서 Multipart form/data 형식의 데이터를 전송할때 JSOn이 OCTET_STREAM 으로 전송되는 현상을 제어하기 위한 컨버터.
application/octet-stream 사용을 비활성화한다.
*/

@Component
public class MultipartFormHttpMessageConverter extends AbstractJackson2HttpMessageConverter {

    public MultipartFormHttpMessageConverter(ObjectMapper objectMapper) {
        super(objectMapper, MediaType.APPLICATION_OCTET_STREAM);
    }

    @Override
    public boolean canWrite(Class<?> clazz, MediaType mediaType) {
        return false;
    }

    @Override
    public boolean canWrite(Type type, Class<?> clazz, MediaType mediaType) {
        return false;
    }

    @Override
    protected boolean canWrite(MediaType mediaType) {
        return false;
    }
}
