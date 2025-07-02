-- Create leaves table
CREATE TABLE leaves (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    leave_type VARCHAR(20) NOT NULL CHECK (
        leave_type IN (
            'ANNUAL',
            'SICK',
            'MATERNITY',
            'PATERNITY',
            'EMERGENCY',
            'UNPAID'
        )
    ),
    reason TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (
        status IN (
            'PENDING',
            'APPROVED',
            'REJECTED'
        )
    ),
    approved_by BIGINT,
    approved_at TIMESTAMP,
    rejection_reason TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (employee_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users (id) ON DELETE SET NULL
);

-- Create indexes
CREATE INDEX idx_leaves_employee_id ON leaves (employee_id);

CREATE INDEX idx_leaves_status ON leaves (status);

CREATE INDEX idx_leaves_start_date ON leaves (start_date);

CREATE INDEX idx_leaves_end_date ON leaves (end_date);

CREATE INDEX idx_leaves_created_at ON leaves (created_at);