// Components
import { FeedbackCard } from "@/components";
import { MOCK_AVATARS } from "@/mocks/avatar";

const FeedbackSection = () => {
  return (
    <section>
      <div className="flex justify-center">
        <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl my-0 py-40 flex flex-col gap-20">
          <div className="flex flex-col gap-2.5 text-center 2xl:text-start">
            <h6 className="text-primary text-sm/6 font-bold">
              Practice Advice
            </h6>
            <h2 className="text-foreground text-5xl/12.5 font-bold">
              Approdable Packages
            </h2>
            <p className="text-foreground-100 text-sm">
              Problems trying to resolve the conflict between
              <br />
              the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>
          <div className="flex flex-wrap gap-7.5 justify-evenly">
            <FeedbackCard avatar={MOCK_AVATARS[0]} />
            <FeedbackCard avatar={MOCK_AVATARS[1]} />
            <FeedbackCard avatar={MOCK_AVATARS[2]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
