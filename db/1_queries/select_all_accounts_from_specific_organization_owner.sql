SELECT accounts.*, organization.name, organization.owner
    FROM accounts
    JOIN organization ON accounts.organization_id = organization.id
    WHERE organization.id = 1
    AND organization.owner = 'Sheba Auletta';
