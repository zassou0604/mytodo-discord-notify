type DashboardProps = {
    todos: {
        id: number;
        title: string;
        priority: number;
        deadline: string;
        completed: boolean;
    }[];
};

function Dashboard({ todos }: DashboardProps) {
    const totalCount = todos.length;

    const completedCount = todos.filter(
    (todo) => todo.completed
    ).length;

    const incompleteTodos = todos.filter(
    (todo) => !todo.completed
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const upcomingTodos = todos.filter(todo => !todo.completed).filter(todo => {
        const [year, month, day] = todo.deadline.split("-").map(Number);
        const deadlineDate = new Date(year, month - 1, day);
        return deadlineDate >= today && deadlineDate <= nextWeek;
    }).sort((a, b) => a.deadline.localeCompare(b.deadline));
    const overdueTodos = todos.filter(todo => {
        if (todo.completed) {
            return false;
        }
        const [year, month, day] = todo.deadline.split("-").map(Number);
        const deadlineDate = new Date(year, month - 1, day);
        return deadlineDate < today;
    });
    const completionRate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
    // const highPriorityCount = todos.filter(
    //     todo => !todo.completed && todo.priority === 1
    // ).length;
    // const overdueCount = overdueTodos.length;

    return (
        <section className="dashboard">
            <h2>Dashboard</h2>

            <div className="dashboard-summary">
                <div className="summary-card">
                    <span>全タスク</span>
                    <strong>{totalCount}</strong>
                </div>
                <div className="summary-card">
                    <span>完了</span>
                    <strong>{completedCount}</strong>
                </div>
                <div className="summary-card">
                    <span>未完了</span>
                    <strong>{incompleteTodos.length}</strong>
                </div>
            </div>

            <div className="dashboard-section">
                <h3>未完了のタスク</h3>
                {incompleteTodos.map(todo => (
                    <p key={todo.id}>
                        {todo.title}（期限：{todo.deadline}）
                    </p>
                ))}
            </div>

            <div className="dashboard-lists">
                <div className="dashboard-section">
                    <h3>7日以内が期限のタスク</h3>
                    {upcomingTodos.length > 0 ? (
                        upcomingTodos.map(todo => (
                            <p key={todo.id}>
                                {todo.title}（期限：{todo.deadline}）
                            </p>
                        ))
                    ) : (
                        <p>該当するタスクはありません。</p>
                    )}
                </div>

                <div className="dashboard-section">
                    <h3>期限切れのタスク</h3>
                    {overdueTodos.length > 0 ? (
                        overdueTodos.map(todo => (
                            <p key={todo.id} className="overdue-text">
                                {todo.title}（期限：{todo.deadline}）
                            </p>
                        ))
                    ) : (
                        <p>期限切れのタスクはありません。</p>
                    )}
                </div>
            </div>

            <div className="progress-container">
                <div className="progress-info">
                    <span>タスク完了率</span>
                    <span>{completionRate}%</span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${completionRate}%` }}
                    />
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
