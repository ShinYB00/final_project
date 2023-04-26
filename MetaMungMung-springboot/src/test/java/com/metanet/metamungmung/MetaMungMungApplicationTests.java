package com.metanet.metamungmung;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Base64;

@SpringBootTest
@AutoConfigureMockMvc
class MetaMungMungApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    void jwts_test() {
        String payload = "eyJzdWIiOiJrb3NhOCIsIm1lbWJlcklkeCI6OSwiZXhwIjoxNjgzMzU1NDAxfQ";
        Base64.Decoder decoder = Base64.getUrlDecoder();

        System.out.println(new String(decoder.decode(payload)));
    }

}
