package vn.com.insee.corporate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.com.insee.corporate.response.BaseResponse;

import java.util.Map;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @PostMapping(value = "/verify_phone", consumes = "application/json", produces = "application/json")
    public ResponseEntity<BaseResponse> authenticate(@RequestBody Map<String, String> dataMap) throws Exception {
        BaseResponse response = new BaseResponse();
        return ResponseEntity.ok(response);
    }

}
