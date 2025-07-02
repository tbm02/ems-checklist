-- Create projects table
CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    project_lead_id BIGINT,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (
        status IN (
            'ACTIVE',
            'COMPLETED',
            'ON_HOLD',
            'CANCELLED'
        )
    ),
    created_by BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (project_lead_id) REFERENCES users (id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE
);

-- Create project_members junction table
CREATE TABLE project_members (
    project_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    PRIMARY KEY (project_id, user_id),
    FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_projects_project_lead_id ON projects (project_lead_id);

CREATE INDEX idx_projects_created_by ON projects (created_by);

CREATE INDEX idx_projects_status ON projects (status);

CREATE INDEX idx_projects_start_date ON projects (start_date);

CREATE INDEX idx_projects_end_date ON projects (end_date);

CREATE INDEX idx_project_members_project_id ON project_members (project_id);

CREATE INDEX idx_project_members_user_id ON project_members (user_id);