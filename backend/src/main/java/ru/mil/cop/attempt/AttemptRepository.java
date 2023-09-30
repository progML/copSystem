package ru.mil.cop.attempt;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.mil.cop.attempt.AttemptEntity;
import ru.mil.cop.attempt.AttemptStatus;

import java.util.List;
import java.util.Optional;

@Repository
public interface AttemptRepository extends CrudRepository<AttemptEntity, Integer> {

    AttemptEntity findByUserIdAndExamId(Integer userId, Integer examId);

    List<AttemptEntity> findByExamId(Integer examId);
}

