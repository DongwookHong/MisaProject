package org.example.misa;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Misa API",
                description = "Misa API 문서입니다.",
                version = "v1"
        )
)
@SecurityScheme(name = "x-api-key", type = SecuritySchemeType.APIKEY, in = SecuritySchemeIn.HEADER, paramName = "x-api-key")
public class SwaggerConfig {
    String AuthorizationHeader = "x-api-key";

    @Bean
    public OpenAPI openAPI() {
        SecurityRequirement securityRequirement = new SecurityRequirement().addList(AuthorizationHeader);
        return new OpenAPI()
                .addServersItem(new Server().url("/"))
                .addSecurityItem(securityRequirement);
    }

}
