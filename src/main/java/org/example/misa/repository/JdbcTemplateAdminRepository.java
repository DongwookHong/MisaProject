package org.example.misa.repository;

import org.example.misa.domain.StoreMember;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.util.List;
import java.util.Optional;

public class JdbcTemplateAdminRepository implements AdminRepository {

    private final JdbcTemplate jdbcTemplate;

    public JdbcTemplateAdminRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public StoreMember save(StoreMember storemember) {
        return null;
    }

    @Override
    public Optional<StoreMember> findByStoreName(String storename) {
        return Optional.empty();
    }

    @Override
    public List<StoreMember> findAll() {
        return List.of();
    }
}
