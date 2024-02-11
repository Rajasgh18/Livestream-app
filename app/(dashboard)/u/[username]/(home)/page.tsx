interface CreatorDashboard {
    params: {
        username: string;
    };
}

const CreatorDashboard = ({ params }: CreatorDashboard) => {
    return (
        <div className="">
            User: {params.username}
        </div>
    );
};

export default CreatorDashboard;