-- Create notifications table
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    recipient_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT,
    type VARCHAR(30) NOT NULL CHECK (
        type IN (
            'LEAVE_REQUEST',
            'LEAVE_APPROVED',
            'LEAVE_REJECTED',
            'RESIGNATION_REQUEST',
            'RESIGNATION_APPROVED',
            'RESIGNATION_REJECTED',
            'PROJECT_ASSIGNMENT',
            'POLICY_UPDATE',
            'GENERAL'
        )
    ),
    read BOOLEAN DEFAULT FALSE,
    reference_id BIGINT,
    reference_type VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (recipient_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_notifications_recipient_id ON notifications (recipient_id);

CREATE INDEX idx_notifications_read ON notifications (read);

CREATE INDEX idx_notifications_type ON notifications(type);

CREATE INDEX idx_notifications_created_at ON notifications (created_at);

CREATE INDEX idx_notifications_reference ON notifications (reference_id, reference_type);