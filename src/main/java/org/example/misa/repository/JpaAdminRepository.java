package org.example.misa.repository;

import jakarta.persistence.EntityManager;
import org.example.misa.domain.StoreMember;

import java.awt.geom.Area;
import java.util.List;
import java.util.Optional;

public class JpaAdminRepository implements AdminRepository {

    private final EntityManager em;

    public JpaAdminRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public StoreMember save(StoreMember storemember) {
        em.persist(storemember);
        return storemember;
    }

    @Override
    public Optional<StoreMember> findByStoreName(String storename) {
        List<StoreMember> result = em.createQuery("select m from StoreMember m where m.storeName = :storename", StoreMember.class)
                .setParameter("storename", storename)
                .getResultList();
        return result.stream().findAny();
    }

    @Override
    public List<StoreMember> findAll() {
        return em.createQuery("select m from StoreMember m", StoreMember.class).getResultList();
    }
}
