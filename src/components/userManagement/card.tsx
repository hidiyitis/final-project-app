import { Card, CardHeader, CardBody } from "@nextui-org/react";

interface Admin {
  name: string;
  email: string;
  image: string;
  visited: string;
}

interface CustomCardProps {
  admin: Admin;
}

const CustomCard: React.FC<CustomCardProps> = ({ admin }) => {
  return (
    <Card className="py-4 flex flex-col items-center justify-center text-center">
      <CardBody className="py-2 flex flex-col items-center justify-center">
        <img
          alt={admin.name}
          className="object-cover rounded-xl"
          src={admin.image}
          width={320}
          height={320}
        />
      </CardBody>
      <CardHeader className="pb-0 pt-2 px-4 flex-col">
        <h3 className="font-bold text-large text-center">{admin.name}</h3>
        <div>
          <p className="text-default-500">{admin.email}</p>
        </div>
        <small className="text-default-500">
          Last Visited: {admin.visited}
        </small>
      </CardHeader>
    </Card>
  );
};

export default CustomCard;
