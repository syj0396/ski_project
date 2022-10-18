package com.project.ski.web;

import com.project.ski.config.auth.PrincipalDetails;
import com.project.ski.service.AuthService;
import com.project.ski.web.dto.CMRespDto;
import com.project.ski.web.dto.JoinRespDto;
import com.project.ski.domain.user.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserApiController {

    private final AuthService authService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("join")
    public ResponseEntity<?> join(@RequestBody Users user) {
        JoinRespDto joinDto = authService.userJoin(user);
        return new ResponseEntity<>(new CMRespDto<>(1, "회원가입완료", joinDto), HttpStatus.OK);
    }

    @PostMapping("login")
    public PrincipalDetails login(Authentication authentication) {
        PrincipalDetails principalDetails = authService.userLogin(authentication);
        return principalDetails;
    }

}
