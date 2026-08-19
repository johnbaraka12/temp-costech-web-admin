import '../css/SponsorshipsPage.css';
import { resolveAssetUrl } from '../utils/imageUrlMigration';

export function SponsorshipsPage({ onBack, onSave, sponsorships = [], onAddSponsorshipClick, onDelete, onEdit }) {

  return (
    <div className="sponsorship-page">
      <div className="sponsorship-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="sponsorship-page-title">Sponsorships Management</h1>
      </div>

      <div className="sponsorship-page-content">
        {/* Sponsorships List */}
        <div className="sponsorship-list-container">
          <div className="sponsorship-list-header">
            <h2 className="sponsorship-list-title">All Sponsorships ({sponsorships.length})</h2>
            <button className="add-sponsorship-button" onClick={onAddSponsorshipClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Sponsorship</span>
            </button>
          </div>
          {sponsorships.length === 0 ? (
            <div className="no-sponsorships">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>No sponsorships uploaded yet. Create your first sponsorship above!</p>
            </div>
          ) : (
            <div className="sponsorship-table-wrapper">
              <table className="sponsorship-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Document</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sponsorships.map((sponsorship) => (
                    <tr key={sponsorship.id}>
                      <td className="table-title-cell">
                        <strong>{sponsorship.title}</strong>
                      </td>
                      <td className="table-description-cell">
                        {sponsorship.description || 'No description'}
                      </td>
                      <td className="table-document-cell">
                        {sponsorship.document ? (
                          <a href={resolveAssetUrl(sponsorship.document)} target="_blank" rel="noopener noreferrer" className="document-link">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            View Document
                          </a>
                        ) : (
                          <span className="no-document">No Document</span>
                        )}
                      </td>
                      <td className="table-date-cell">
                        {sponsorship.createdAt ? new Date(sponsorship.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onEdit && (
                            <button
                              className="edit-button"
                              onClick={() => onEdit(sponsorship)}
                              title="Edit sponsorship"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(sponsorship.id)}
                              title="Delete sponsorship"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
