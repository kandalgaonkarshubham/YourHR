import Header from "components/Header";
import Footer from "components/Footer";

export default function Jobs() {
  return (
    <>
      <Header />
      <div className="bg-teal-50 p-24 bg-[url('/img/banner.svg')] bg-no-repeat bg-contain bg-right">
        <h3 className="font-semibold text-4xl">Find your dream job</h3>
        <p className="font-medium text-lg mt-2">
          Looking for jobs? Browse our latest job openings to view & apply to
          the best jobs today!
        </p>
      </div>
      <Footer />
    </>
  );
}
