package portfolio_cms_backend.service;

import portfolio_cms_backend.model.Profile;
import portfolio_cms_backend.repository.ProfileRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    public Profile getProfileById(Long id) {

        return profileRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Profile not found")
                );
    }

    public Profile updateProfile(Long id, Profile profile) {

        Profile existingProfile =
                profileRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Profile not found")
                        );

        existingProfile.setName(profile.getName());
        existingProfile.setTitle(profile.getTitle());
        existingProfile.setBio(profile.getBio());
        existingProfile.setEmail(profile.getEmail());
        existingProfile.setLocation(profile.getLocation());
        existingProfile.setProfileImageUrl(
                profile.getProfileImageUrl()
        );
        existingProfile.setResumeUrl(
                profile.getResumeUrl()
        );
        existingProfile.setLinkedinUrl(
                profile.getLinkedinUrl()
        );
        existingProfile.setGithubUrl(
                profile.getGithubUrl()
        );

        return profileRepository.save(existingProfile);
    }

    public void deleteProfile(Long id) {

        if (!profileRepository.existsById(id)) {
            throw new RuntimeException("Profile not found");
        }

        profileRepository.deleteById(id);
    }
}