import banner from '../../../public/ads/dgbanner.gif';

const CompleteSolution = () => {
  return (
    <div className="w-full px-4 py-6 flex justify-center items-center">
      <div className="w-full max-w-7xl">
        <img
          src={banner}
          alt="BluRock Ionic"
          className="w-full h-auto rounded-xl shadow-lg object-cover"
        />
      </div>
    </div>
  );
};

export default CompleteSolution;
