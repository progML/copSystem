package ru.mil.cop.exam;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import ru.mil.cop.attempt.AttemptEntity;
import ru.mil.cop.attempt.AttemptRepository;
import ru.mil.cop.attempt.dto.AttemptInfoDto;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@AllArgsConstructor
public class ExamController {
    public final ExamRepository examRepository;
    private final AttemptRepository attemptRepository;

    @GetMapping("/api/exam/names")
    public List<ExamNameDto> getExamNames() {
        return StreamSupport.stream(examRepository.findAll().spliterator(), false)
                .map(it -> new ExamNameDto(it.getId(), it.getName()))
                .sorted(Comparator.comparing(ExamNameDto::getName))
                .collect(Collectors.toList());
    }

    @GetMapping("/api/exam/{examId}/withoutAnswers")
    public ExamEntity getExamWithoutAnswers(@PathVariable Integer examId) {
        ExamEntity examEntity = getExamEntity(examId);
        examEntity.getQuestions().forEach(it -> it.setRightAnswer(null));
        return examEntity;
    }

    @GetMapping("/api/exam/attempts/{examId}")
    public ExamResultDto getExamAttempts(@PathVariable Integer examId) {
        ExamEntity examEntity = getExamEntity(examId);

        List<AttemptInfoDto> attempts = attemptRepository.findByExamId(examId).stream()
                .sorted(Comparator.comparingInt(AttemptEntity::getId).reversed())
                .map(AttemptEntity::createAttemptInfoDto)
                .collect(Collectors.toList());

        return new ExamResultDto(examEntity.getName(), attempts);
    }

    private ExamEntity getExamEntity(Integer examId) {
        return examRepository.findById(examId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Теста с id: " + examId + " не существует"));
    }
}
