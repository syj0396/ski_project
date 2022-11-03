package com.project.ski.web.api;

import com.project.ski.config.auth.PrincipalDetails;
import com.project.ski.service.SubmitService;
import com.project.ski.web.dto.AdmitDto;
import com.project.ski.web.dto.CmRespDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/submit/")
public class SubmitApiController {

    private final SubmitService submitService;

    @PostMapping("{toCarpoolId}")
    public CmRespDto<?> submit(Authentication authentication, @PathVariable long toCarpoolId) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        long userId = principalDetails.getUser().getId();
        submitService.submit(userId, toCarpoolId);
        return new CmRespDto<>(1, "제출 성공", null);
    }

    @DeleteMapping("{toCarpoolId}")
    public CmRespDto<?> unSubmit(Authentication authentication, @PathVariable long toCarpoolId) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        long userId = principalDetails.getUser().getId();
        submitService.unSubmit(userId, toCarpoolId);
        return new CmRespDto<>(1, "삭제 성공", null);
    }


    // entity를 직접 반환했음. 수정 해야함
    @GetMapping("{toCarpoolId}")
    public CmRespDto<?> getSubmit(@PathVariable long toCarpoolId, Authentication authentication) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        long userId = principalDetails.getUser().getId();
        return new CmRespDto<>(1, "카풀 제출 리스트 가져오기 성공", submitService.getSubmit(toCarpoolId));
    }

    @PostMapping("admit")
    public CmRespDto<?> admit(@RequestBody AdmitDto dto) {
        submitService.admit(dto);
        return new CmRespDto<>(1, "승인 성공", null);
    }

    @DeleteMapping("admit")
    public CmRespDto<?> unAdmit(@RequestBody AdmitDto dto) {
        submitService.deleteAdmit(dto);
        return new CmRespDto<>(1, "거부 성공", null);
    }
}
