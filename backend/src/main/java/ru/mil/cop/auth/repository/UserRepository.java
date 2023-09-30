package ru.mil.cop.auth.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.mil.cop.auth.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    Optional<User> findByUsername(String username);

    boolean existsByUsernameAndSurnameAndPatronymicAndGroupNumber(String username, String surname, String patronymic, String groupNumber);

    @Query("SELECT u.id FROM User u WHERE u.username = :username AND u.surname = :surname AND u.patronymic = :patronymic AND u.groupNumber = :groupNumber")
    Integer findIdByUsernameAndSurnameAndPatronymicAndGroupNumber(@Param("username") String username, @Param("surname") String surname, @Param("patronymic") String patronymic, @Param("groupNumber") String groupNumber);
}
