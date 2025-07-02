-- Create announcements table
CREATE TABLE announcements (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    created_by BIGINT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    priority VARCHAR(20) NOT NULL DEFAULT 'NORMAL' CHECK (
        priority IN (
            'LOW',
            'NORMAL',
            'HIGH',
            'URGENT'
        )
    ),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_announcements_created_by ON announcements (created_by);

CREATE INDEX idx_announcements_active ON announcements (active);

CREATE INDEX idx_announcements_priority ON announcements (priority);

CREATE INDEX idx_announcements_created_at ON announcements (created_at);