-- Create resignations table
CREATE TABLE resignations (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    reason TEXT,
    last_working_date DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (
        status IN (
            'PENDING',
            'APPROVED',
            'REJECTED'
        )
    ),
    reviewed_by BIGINT,
    reviewed_at TIMESTAMP,
    admin_comments TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (employee_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES users (id) ON DELETE SET NULL
);

-- Create indexes
CREATE INDEX idx_resignations_employee_id ON resignations (employee_id);

CREATE INDEX idx_resignations_status ON resignations (status);

CREATE INDEX idx_resignations_last_working_date ON resignations (last_working_date);

CREATE INDEX idx_resignations_created_at ON resignations (created_at);