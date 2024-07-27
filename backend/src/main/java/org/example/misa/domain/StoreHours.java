package org.example.misa.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.example.misa.DTO.StoreDTO;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class StoreHours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false)
    private StoreMember storeMember;

    @Column(nullable = false)
    private String dayOfWeek;

    @Column(nullable = false)
    private boolean isOpen;

    @Column(nullable = false)
    private String openTime;

    @Column(nullable = false)
    private String closeTime;

    private String breakStartTime;

    private String breakEndTime;

    private String lastOrder;

    public StoreHours(StoreMember storeMember,
                      String dayOfWeek,
                      boolean open,
                      String openTime,
                      String closeTime,
                      String breakStartTime,
                      String breakEndTime,
                      String lastOrder) {
        this.storeMember = storeMember;
        this.dayOfWeek = dayOfWeek;
        this.isOpen = open;
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.breakStartTime = breakStartTime;
        this.breakEndTime = breakEndTime;
        this.lastOrder = lastOrder;
    }

    public static StoreHours create(StoreMember storeMember, StoreDTO.StoreHoursData storeHoursData) {
        return new StoreHours(storeMember,
                storeHoursData.getDayOfWeek(),
                storeHoursData.isOpen(),
                storeHoursData.getOpenTime(),
                storeHoursData.getCloseTime(),
                storeHoursData.getBreakStartTime(),
                storeHoursData.getBreakEndTime(),
                storeHoursData.getLastOrder());
    }

    public void update(StoreDTO.StoreHoursData storeHoursData) {
        this.dayOfWeek = storeHoursData.getDayOfWeek();
        this.isOpen = storeHoursData.isOpen();
        this.openTime = storeHoursData.getOpenTime();
        this.closeTime = storeHoursData.getCloseTime();
        this.breakStartTime = storeHoursData.getBreakStartTime();
        this.breakEndTime = storeHoursData.getBreakEndTime();
        this.lastOrder = storeHoursData.getLastOrder();
    }

    public static List<StoreHours> storeHoursList(StoreMember storeMember, List<StoreDTO.StoreHoursData> storeHoursDatas) {
        List<StoreHours> storeHoursList = new ArrayList<>();
        if (storeHoursDatas != null) {
            for (StoreDTO.StoreHoursData storeHoursData : storeHoursDatas) {
                StoreHours storeHours = create(storeMember, storeHoursData);
                storeHoursList.add(storeHours);
            }
        }
        return storeHoursList;
    }
}
