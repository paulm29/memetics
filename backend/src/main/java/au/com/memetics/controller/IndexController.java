package au.com.memetics.controller;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Slf4j
@Hidden
public class IndexController {
    @GetMapping("/")
    public String index() {
        return "index";
    }

    @RequestMapping(path = {"/profile/**", "/login/**", "/registration/**", "/admin/**", "favicon.ico"})
    public String forwardToApp() {
        return "forward:/index.html";
    }
}
