package ru.mil.cop.exam;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "exam", path = "exam")
public interface ExamRepository extends CrudRepository<ExamEntity, Integer> {
    List<Integer> findByName(@Param("name") String name);
}
