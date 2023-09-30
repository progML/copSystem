package ru.mil.cop.attempt;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import ru.mil.cop.attempt.dto.AttemptFullInfoDto;
import ru.mil.cop.attempt.dto.AttemptIdDto;
import ru.mil.cop.attempt.dto.AttemptInfoDto;
import ru.mil.cop.attempt.dto.AttemptSubmissionDto;
import ru.mil.cop.attempt.dto.CreateAttemptDto;
import ru.mil.cop.exam.ExamRepository;

@RestController
@RequestMapping("/api/attempt")
@AllArgsConstructor
public class AttemptController {

    private final AttemptService attemptService;
    private final ExamRepository examRepository;

    @GetMapping("/{attemptId}")
    public AttemptFullInfoDto getAttemptFullInfo(@PathVariable Integer attemptId) {
        return attemptService.getAttemptFullInfo(attemptId);
    }

    @DeleteMapping("/{attemptId}")
    public void deleteAttempt(@PathVariable Integer attemptId) {
        attemptService.deleteAttempt(attemptId);
    }

    @PostMapping("/check")
    public AttemptIdDto initTest(@RequestBody CreateAttemptDto createAttemptDto) {
        Integer userId = attemptService.getUserId(createAttemptDto.getName(), createAttemptDto.getSurname(),
                createAttemptDto.getPatronymic(), createAttemptDto.getGroupNumber());

        if (!examRepository.existsById(createAttemptDto.getExamId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Теста с id: " + createAttemptDto.getExamId() + " не существует");
        }

        Integer attemptId = attemptService.checkUserAttempt(userId, createAttemptDto.getExamId());

        if (attemptId == null) {
            throw new ResponseStatusException(HttpStatus.LOCKED, "Вы уже проходили данный тест. Свяжитесь с преподавателем для повторного прохождения");
        }

        return new AttemptIdDto(attemptId);
    }

    @PostMapping("/pass/{attemptId}")
    public AttemptInfoDto finishTest(@PathVariable Integer attemptId, @RequestBody AttemptSubmissionDto attemptSubmissionDto) {
        AttemptEntity attemptEntity = attemptService.finishTest(attemptId, attemptSubmissionDto);
        return attemptEntity.createAttemptInfoDto();
    }
}
