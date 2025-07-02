-- Insert initial admin user (password: admin123)
INSERT INTO users (username, email, password, first_name, last_name, role, enabled, created_at, updated_at)
VALUES ('admin', 'admin@ems.com', 'admin123', 'System', 'Administrator', 'ADMIN', true, NOW(), NOW());

-- Insert sample employee user (password: employee123)
INSERT INTO users (username, email, password, first_name, last_name, role, enabled, created_at, updated_at)
VALUES ('john.doe', 'john.doe@ems.com', 'employee123', 'John', 'Doe', 'EMPLOYEE', true, NOW(), NOW());
