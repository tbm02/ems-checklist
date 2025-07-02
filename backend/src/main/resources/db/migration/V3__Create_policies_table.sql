-- Create policies table
CREATE TABLE policies (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    effective_date DATE,
    created_by BIGINT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_policies_created_by ON policies (created_by);

CREATE INDEX idx_policies_active ON policies (active);

CREATE INDEX idx_policies_effective_date ON policies (effective_date);

CREATE INDEX idx_policies_created_at ON policies (created_at);