-- Insert initial admin user
-- Password: admin123 (hashed with BCrypt)
INSERT INTO
    users (
        username,
        email,
        password,
        first_name,
        last_name,
        role,
        enabled,
        created_at,
        updated_at
    )
VALUES (
        'admin',
        'admin@ems.com',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqyc.Npx9k5nI9Nt4nQQfRG',
        'System',
        'Administrator',
        'ADMIN',
        true,
        NOW(),
        NOW()
    );

-- Insert sample employee user
-- Password: employee123 (hashed with BCrypt)
INSERT INTO
    users (
        username,
        email,
        password,
        first_name,
        last_name,
        role,
        enabled,
        created_at,
        updated_at
    )
VALUES (
        'john.doe',
        'john.doe@ems.com',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqyc.Npx9k5nI9Nt4nQQfRG',
        'John',
        'Doe',
        'EMPLOYEE',
        true,
        NOW(),
        NOW()
    );

-- Insert sample announcement
INSERT INTO
    announcements (
        title,
        content,
        created_by,
        active,
        priority,
        created_at,
        updated_at
    )
VALUES (
        'Welcome to EMS',
        'Welcome to the Employee Management System. Please update your profile and familiarize yourself with the company policies.',
        1,
        true,
        'HIGH',
        NOW(),
        NOW()
    );

-- Insert sample policy
INSERT INTO
    policies (
        title,
        description,
        effective_date,
        created_by,
        active,
        created_at,
        updated_at
    )
VALUES (
        'Code of Conduct',
        'All employees must maintain professional behavior and adhere to company values at all times.',
        CURRENT_DATE,
        1,
        true,
        NOW(),
        NOW()
    );