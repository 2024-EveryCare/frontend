import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseXML, formatPrecautions } from '../../utils/xmlParser'; // XML 파싱 유틸리티 함수 (아래 참조)
import Loading from './Loading';

const PillDetailSearch: React.FC<{ drugName: string; imageUrl: string }> = ({
  drugName,
  imageUrl,
}) => {
  const [drugData, setDrugData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrugData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/medicines/details`,
          {
            params: { drugName },
          },
        );
        setDrugData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchDrugData();
  }, [drugName]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!drugData) {
    return null;
  }

  const {
    itemName,
    etcOtcCode,
    chart,
    storageMethod,
    validTerm,
    eeDocData,
    udDocData,
    nbDocData,
  } = drugData;

  return (
    <div className="h-[88vh] mb-20">
      <div className="p-6 mx-auto">
        <div className="w-full flex items-center justify-center space-x-4 mb-8">
          <img
            src={imageUrl}
            alt={drugName}
            className="w-[40%] h-[10vh] object-cover"
          />
          <div className="text-base font-extrabold mb-4">{itemName}</div>
        </div>
        <div className="h-[76vh] overflow-auto scrollbar-custom">
          <div>
            <strong className="text-lg font-semibold text-black">
              의약품 구분:
            </strong>
            <p className="text-sm text-gray-600">{etcOtcCode}</p>
          </div>
          <hr className="my-4" />
          <div>
            <strong className="text-lg font-semibold text-black">성상:</strong>
            <p className="text-sm text-gray-600">{chart}</p>
          </div>
          <hr className="my-4" />
          <div>
            <strong className="text-lg font-semibold text-black">
              보관 방법:
            </strong>
            <p className="text-sm text-gray-600">{storageMethod}</p>
          </div>
          <hr className="my-4" />
          <div>
            <strong className="text-lg font-semibold text-black">
              유효기간:
            </strong>
            <p className="text-sm text-gray-600">{validTerm}</p>
          </div>
          <hr className="my-4" />
          <div className="space-y-4">
            <div>
              <strong className="text-lg font-semibold text-black">
                효능효과:
              </strong>
              <div
                className="text-sm text-gray-600"
                dangerouslySetInnerHTML={{ __html: parseXML(eeDocData) }}
              />
            </div>
            <hr className="my-4" />
            <div>
              <strong className="text-lg font-semibold text-black">
                용법용량:
              </strong>
              <div
                className="text-sm text-gray-600"
                dangerouslySetInnerHTML={{ __html: parseXML(udDocData) }}
              />
            </div>
            <hr className="my-4" />
            <div>
              <strong className="text-lg font-semibold text-black">
                사용상의 주의사항:
              </strong>
              <div
                className="text-sm text-gray-600 whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: formatPrecautions(parseXML(nbDocData)),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PillDetailSearch;
