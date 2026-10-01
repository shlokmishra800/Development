package com.t2t.config;

import com.t2t.model.*;
import com.t2t.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private SmartBinRepository smartBinRepository;

    @Autowired
    private RewardRepository rewardRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Override
    public void run(String... args) throws Exception {
        try {
            System.out.println("🌱 Checking MongoDB Data Seeder...");

        // 1. Seed Users if empty
        if (userRepository.count() == 0) {
            System.out.println("👤 Seeding initial Users into MongoDB...");
            User u1 = new User(
                "usr-101",
                "Aarav Sharma",
                "citizen@t2t.org",
                "citizen123",
                "CITIZEN",
                "ACTIVE",
                null,
                480,
                Arrays.asList("Eco Champion", "Zero Waste Novice", "Community Pillar"),
                50.0,
                38.5,
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                "Sector 14, Block B",
                "+91 98765-11111",
                null
            );

            User u2 = new User(
                "col-201",
                "Officer Rajesh K.",
                "collector@t2t.org",
                "collector123",
                "COLLECTOR",
                "ACTIVE",
                null,
                1250,
                Arrays.asList("Sanitation Hero", "Fleet Master"),
                100.0,
                95.0,
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                "Municipal Fleet Base",
                "+91 98765-43210",
                "FLEET-TRUCK-04"
            );

            User u3 = new User(
                "adm-301",
                "Shlok Mishra (Admin)",
                "shlokmishra576@gmail.com",
                "shlok123",
                "ADMIN",
                "ACTIVE",
                null,
                5000,
                Arrays.asList("Municipal Director", "Sustainability Lead"),
                500.0,
                450.0,
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
                "City HQ",
                "+91 90000-00001",
                "HQ-COMMAND"
            );

            userRepository.saveAll(Arrays.asList(u1, u2, u3));
        } else {
            // Ensure single authorized admin account exists with updated email shlokmishra576@gmail.com and password shlok123
            Optional<User> adminOpt = userRepository.findByEmail("shlokmishra576@gmail.com");
            if (adminOpt.isEmpty()) {
                // Remove any old admin user with legacy email if present
                userRepository.findByEmail("admin@t2t.org").ifPresent(userRepository::delete);

                User u3 = new User(
                    "adm-301",
                    "Shlok Mishra (Admin)",
                    "shlokmishra576@gmail.com",
                    "shlok123",
                    "ADMIN",
                    "ACTIVE",
                    null,
                    5000,
                    Arrays.asList("Municipal Director", "Sustainability Lead"),
                    500.0,
                    450.0,
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
                    "City HQ",
                    "+91 90000-00001",
                    "HQ-COMMAND"
                );
                userRepository.save(u3);
            } else {
                User admin = adminOpt.get();
                admin.setPassword("shlok123");
                admin.setRole("ADMIN");
                userRepository.save(admin);
            }
        }

        // 2. Seed Complaints if empty
        if (complaintRepository.count() == 0) {
            System.out.println("📦 Seeding initial Waste Complaints into MongoDB...");
            Complaint c1 = new Complaint(
                "T2T-8921",
                "usr-101",
                "Aarav Sharma",
                "Illegal E-Waste Spill Near City Park",
                "E_WASTE",
                "Discarded computer monitors and battery components near children's playground.",
                "https://images.unsplash.com/photo-1550985616-10810253b84d?w=600&auto=format&fit=crop&q=80",
                28.6139,
                77.2090,
                "Central Park West Gate, Sector 14",
                "IN_PROGRESS",
                "HIGH",
                LocalDateTime.now().minusDays(2),
                null,
                "col-201",
                "Squad dispatched and gathering hazardous battery waste.",
                null
            );

            Complaint c2 = new Complaint(
                "T2T-8922",
                "usr-101",
                "Aarav Sharma",
                "Overflowing Plastic & Paper Bin",
                "RECYCLABLE",
                "Recycling bin #402 is full and plastics are spilling onto sidewalk.",
                "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80",
                28.6210,
                77.2150,
                "Market Road, Block B, Near Metro Station",
                "RESOLVED",
                "MEDIUM",
                LocalDateTime.now().minusDays(3),
                LocalDateTime.now().minusDays(3).plusHours(2),
                "col-201",
                "Bin emptied and area swept clean.",
                "https://images.unsplash.com/photo-1604186837056-8e7c286756f2?w=600&auto=format&fit=crop&q=80"
            );

            Complaint c3 = new Complaint(
                "T2T-8923",
                "usr-103",
                "Vikram Malhotra",
                "EMERGENCY: Chemical Container Leak",
                "HAZARD",
                "Leaking paint and unknown liquid drums behind commercial complex.",
                "https://images.unsplash.com/photo-1611284446314-60a55ac0d49d?w=600&auto=format&fit=crop&q=80",
                28.6050,
                77.1980,
                "Industrial Area Phase 2, Gate 4",
                "ASSIGNED",
                "EMERGENCY",
                LocalDateTime.now().minusHours(4),
                null,
                "col-202",
                "Hazmat unit en route.",
                null
            );

            complaintRepository.saveAll(Arrays.asList(c1, c2, c3));
        }

        // 3. Seed Smart Bins if empty
        if (smartBinRepository.count() == 0) {
            System.out.println("🗑️ Seeding Smart Bins into MongoDB...");
            SmartBin b1 = new SmartBin("BIN-101", "Sector 14 Recyclables Bin", "RECYCLABLE", 85, true, 28.6139, 77.2090, "City Park Gate 1", LocalDateTime.now().minusHours(12));
            SmartBin b2 = new SmartBin("BIN-102", "Market Road Organic Bin", "ORGANIC", 40, true, 28.6210, 77.2150, "Central Market Block B", LocalDateTime.now().minusHours(5));
            SmartBin b3 = new SmartBin("BIN-103", "E-Waste Drop Hub", "E_WASTE", 92, false, 28.6050, 77.1980, "Metro Station Gate 3", LocalDateTime.now().minusDays(1));

            smartBinRepository.saveAll(Arrays.asList(b1, b2, b3));
        }

        // 4. Seed Rewards Store if empty
        if (rewardRepository.count() == 0) {
            System.out.println("🎁 Seeding Eco Rewards into MongoDB...");
            Reward r1 = new Reward("RWD-01", "Free Organic Coffee Vouchers", "Green Brew Cafe", "CAFE", "Get 1 free organic coffee for 200 Eco Points", "ECOBREW200", 100, 200, "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80");
            Reward r2 = new Reward("RWD-02", "20% Off Metro Eco Pass", "City Metro Transit", "TRAVEL", "Save 20% on monthly metro pass", "METRO20ECO", 20, 350, "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80");

            rewardRepository.saveAll(Arrays.asList(r1, r2));
        }

        // 5. Seed Feedback if empty
        if (feedbackRepository.count() == 0) {
            System.out.println("💬 Seeding Sample Feedback into MongoDB...");
            Feedback f1 = new Feedback(
                "FBK-01",
                "Aarav Sharma",
                "citizen@t2t.org",
                "CITIZEN",
                5,
                "PRAISE",
                "Trash2Treasure app works wonderfully! Live status updates are super fast.",
                LocalDateTime.now().minusDays(1)
            );
            feedbackRepository.save(f1);
        }

        System.out.println("✅ MongoDB Data Seeder Check Complete!");
        } catch (Exception e) {
            System.err.println("⚠️ Seeder notice (non-fatal): " + e.getMessage());
        }
    }
}
