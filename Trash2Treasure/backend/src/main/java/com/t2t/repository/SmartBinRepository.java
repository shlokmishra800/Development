package com.t2t.repository;

import com.t2t.model.SmartBin;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface SmartBinRepository extends MongoRepository<SmartBin, String> {
    List<SmartBin> findByIsAvailable(Boolean isAvailable);
    List<SmartBin> findByBinType(String binType);
}
