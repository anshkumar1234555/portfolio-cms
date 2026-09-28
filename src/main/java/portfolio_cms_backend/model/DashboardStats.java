package portfolio_cms_backend.model;

public class DashboardStats {

    private long projects;
    private long skills;
    private long experiences;
    private long education;
    private long certifications;
    private long blogPosts;
    private long messages;

    public DashboardStats() {
    }

    public DashboardStats(
            long projects,
            long skills,
            long experiences,
            long education,
            long certifications,
            long blogPosts,
            long messages) {

        this.projects = projects;
        this.skills = skills;
        this.experiences = experiences;
        this.education = education;
        this.certifications = certifications;
        this.blogPosts = blogPosts;
        this.messages = messages;
    }

    public long getProjects() {
        return projects;
    }

    public void setProjects(long projects) {
        this.projects = projects;
    }

    public long getSkills() {
        return skills;
    }

    public void setSkills(long skills) {
        this.skills = skills;
    }

    public long getExperiences() {
        return experiences;
    }

    public void setExperiences(long experiences) {
        this.experiences = experiences;
    }

    public long getEducation() {
        return education;
    }

    public void setEducation(long education) {
        this.education = education;
    }

    public long getCertifications() {
        return certifications;
    }

    public void setCertifications(long certifications) {
        this.certifications = certifications;
    }

    public long getBlogPosts() {
        return blogPosts;
    }

    public void setBlogPosts(long blogPosts) {
        this.blogPosts = blogPosts;
    }

    public long getMessages() {
        return messages;
    }

    public void setMessages(long messages) {
        this.messages = messages;
    }
}