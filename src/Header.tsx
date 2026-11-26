type HeaderProps = {
    title: string;
    task_amount: number;
};

function Header({ title, task_amount }: HeaderProps) {
    return (
        <header>
            <h1>{title}</h1>
            <p>現在のタスク数：{task_amount}件</p>
        </header>
    );
}

export default Header;
