SELECT accounts.*, organization.name as organization_name,  organization.owner
FROM accounts
JOIN organization ON accounts.organization_id = organization.id
WHERE organization.id = 1;
