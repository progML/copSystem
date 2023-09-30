package ru.mil.cop.attempt;

import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;
import ru.mil.cop.attempt.dto.AttemptInfoDto;
import ru.mil.cop.exam.ExamEntity;
import ru.mil.cop.auth.model.User;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "attempts")
@NoArgsConstructor
@AllArgsConstructor
@TypeDefs(@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class))
public class AttemptEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "examId")
    private ExamEntity exam;

    @Enumerated(EnumType.STRING)
    @Column(name = "attemptStatus")
    private AttemptStatus attemptStatus;

    @Type(type = "jsonb")
    @Column(columnDefinition = "json")
    private List<List<Integer>> userAnswers;

    private Integer totalCorrectAnswers;

    public AttemptInfoDto createAttemptInfoDto() {
        return new AttemptInfoDto(
                this.getId(),
                this.getExam().getId(),
                this.getUser().getUsername(),
                this.getUser().getSurname(),
                this.getUser().getPatronymic(),
                this.getUser().getGroupNumber(),
                this.getTotalCorrectAnswers(),
                this.getExam().getQuestions().size(),
                this.attemptStatus,
                this.userAnswers
        );
    }
}
