package com.campusconnect.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleConflictDTO {
    private boolean conflict;
    private String conflictReason;
    private String existingSubjectName;
    private String existingRoomNumber;
}
