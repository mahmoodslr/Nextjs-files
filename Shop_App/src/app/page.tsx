import Container from "@/components/Container";

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-sky-600">Welcome Home</h1>
        <p className="text-lg text-gray-600 mt-2">
          This is the home page of our app.
        </p>
      </div>
    </Container>
  );
}
