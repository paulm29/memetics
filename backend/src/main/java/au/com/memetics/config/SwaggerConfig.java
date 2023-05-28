package au.com.memetics.config;

import org.springframework.context.annotation.Configuration;

// http://localhost:8080/memetics/api/swagger-ui.html
@Configuration
public class SwaggerConfig {
//    @Bean
//    public Docket api() {
//        return new Docket(DocumentationType.SWAGGER_2)
//                .select()
//                //.apis(RequestHandlerSelectors.any())
//                .apis(RequestHandlerSelectors.basePackage("au.com.memetics.controller"))
//                .paths(PathSelectors.any()) // regex("/rest/.*")
//                .build()
//                .apiInfo(apiInfo());
//    }
//
//    private ApiInfo apiInfo() {
//        return new ApiInfoBuilder()
//                .title("Memetics")
//                .description("Memetics is the shitposter's best friends.")
//                .termsOfServiceUrl("None")
//                .license("Apache License Version 2.0")
//                .licenseUrl("https://github.com/paulm29/memetics/LICENSE")
//                .version("1.0")
//                .build();
//    }
}
