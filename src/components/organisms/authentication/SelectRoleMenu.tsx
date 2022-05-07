import React from 'react';
import { useHistory } from 'react-router-dom';
import { Title, Label, Button } from '@atoms/common';
import { IconRoleMika, IconRoleAlteacare } from '@assets/images';

interface Props {
  selectRole: any;
}

const SelectRoleMenu = (props: Props) => {
  const { selectRole } = props;
  const history = useHistory();

  const redirectAndSelectRole = (params: string) => {
    history.push('/login');
    selectRole(params);
  };

  return (
    <div className="flex-1 w-full">
      <Title text="E-Pharmarcy AlteaCare" classes="text-center text-darker font-bold pt-12 pb-10" />
      <div className="mb-5">
        <p className="text-dark2 text-sm text-center">
          <Label text="Pilih salah satu untuk masuk ke" />
          <br />
          <Label text="dashboard admin E-Pharmacy AlteaCare" />
        </p>
      </div>
      <div className="flex flex-wrap pb-16 justify-center">
        <div className="w-3/6 pl-6 pr-4">
          <Button
            testid="btn-role-mika"
            handler={() => redirectAndSelectRole('MIKA_PHARMACY')}
            image={IconRoleMika}
            classes="w-full flex flex-wrap px-2 py-4 justify-center border-2 border-dark4 hover:border-darker rounded"
          />
          <p className="w-full text-sm text-dark3 mt-2 text-center">
            <Label text="Farmasi" />
            <br />
            <Label text="RS Mitra Keluarga" testid="mika" />
          </p>
        </div>
        <div className="w-3/6 pr-6 pl-4">
          <Button
            testid="btn-role-altea"
            handler={() => redirectAndSelectRole('ALTEA_PHARMACY')}
            image={IconRoleAlteacare}
            classes="w-full flex flex-wrap px-2 py-4 justify-center border-2 border-dark4 hover:border-darker rounded"
          />
          <p className="w-full text-sm text-dark3 mt-2 text-center">
            <Label text="Farmasi" />
            <br />
            <Label text="AlteaCare" testid="altea" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectRoleMenu;
