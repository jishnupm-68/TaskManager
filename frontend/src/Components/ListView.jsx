import React from 'react'

const ListView = () => {
  let allTasks=[]
  return (
    <div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Assignee</th>
              <th className="px-4 py-3">Due</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Progress</th>
            </tr>
          </thead>
          <tbody>
            {allTasks.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">{t.title}</td>
                <td className="px-4 py-3">{t.assignee}</td>
                <td className="px-4 py-3">{t.due}</td>
                <td className="px-4 py-3">{t.status}</td>
                <td className="px-4 py-3">{t.progress}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListView
