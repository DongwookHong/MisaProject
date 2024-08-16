package org.example.misa.controller;

import jakarta.transaction.Transactional;
import org.example.misa.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import java.util.Base64;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
class MisaUserControllerTest {

    @Autowired private MockMvc mockMvc;

    @Test
    void getStores() {
    }

    @Test
    void store() throws Exception{
        String name = "용용선생";
        name = Base64.getEncoder().encodeToString(name.getBytes());
        MvcResult result = mockMvc.perform(get("/api/stores/" + name).header("x-api-key", "testapikey"))
                .andExpect(status().isOk())
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
    }

    @Test
    void menu() throws Exception {
        MvcResult result = mockMvc.perform(get("/api/menu").header("x-api-key", "testapikey"))
                .andExpect(status().isOk())
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
    }

    @Test
    void qrPage() throws Exception {
        MvcResult result = mockMvc.perform(get("/api/qr-page").header("x-api-key", "testapikey"))
                .andExpect(status().isOk())
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
    }

    @Test
    void findSpot() throws Exception {
        String name = "용용선생";
        name = Base64.getEncoder().encodeToString(name.getBytes());
        MvcResult result = mockMvc.perform(get("/api/find-spot/" + name).header("x-api-key", "testapikey"))
                .andExpect(status().isOk())
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
    }

    @Test
    void floor() throws Exception {
        MvcResult result = mockMvc.perform(get("/api/floor").header("x-api-key", "testapikey"))
                .andExpect(status().isOk())
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
    }

    @Test
    void building() throws Exception {
        String buildingName = "힐스테이트";
        String buildingDong = "A";
        buildingName = Base64.getEncoder().encodeToString(buildingName.getBytes());
        MvcResult result = mockMvc.perform(get("/api/building/" + buildingName + "/" + buildingDong).header("x-api-key", "testapikey"))
                .andExpect(status().isOk())
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
    }
}